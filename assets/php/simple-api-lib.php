<?php

/**
 * App version 1.6.0
 * Check out full documentation at https://app.planeupload.com/api
 */
class PlaneUploadSimpleApi {

    private $API_KEY;

    /**
     * PlaneUploadSimpleApi constructor.
     * @param $API_KEY
     */
    public function __construct($API_KEY = null) {
        $this->API_KEY = $API_KEY;
    }



    /**
     * This method confirms attachments. After execution, a new button is created with files provided
     * in previous form. You can access the files trough generated key you receive in this function's response.
     * It's also visible in your PlaneUpload Admin Panel.
     * @param $directory - target directory where you want to put files in your cloud
     * @param $tag - tag visible only to you
     * @param $ignoreIfNoFiles - don't create button, where there are no files sent (default false)
     * @param $lock - disable adding files after form is sent
     * @return mixed
     */
    public function confirmAttachment($directory,
                                       $tag = "My button from form",
                                       $ignoreIfNoFiles = false,
                                       $lock = false,
                                      $PLANE_UPLOAD_KEY = null
    ) {
        if (null == $PLANE_UPLOAD_KEY) {
            $PLANE_UPLOAD_KEY = $_REQUEST["PLANE_UPLOAD_KEY"];
        }
        return $this->request("api/confirmAttachment",[
           "key"=>$PLANE_UPLOAD_KEY,
            "directory"=>$directory,
            "tag"=>$tag,
            "ignoreIfNoFiles"=>$ignoreIfNoFiles,
            "lock"=>$lock
        ]);
    }

    /**
     * If there is no button with provided system tag, generates a new one
     * @param $systemTag - must be unique tag, if there is no button with this tag, this method generates a new one
     * @param $directory - target directory where you want to put files in your cloud
     * @param $tag - tag visible only to you
     * @param $buttonPrototypeId - ID of the button that settings will be copied to this new button (default none)
     * @param $fileProviderId - ID of the cloud where files will be stored (default latest cloud)
     * @return mixed
     */
    public function provideButton($systemTag,
            $directory,
            $tag = "My button from API",
            $buttonPrototypeId=null,
            $fileProviderId = null
    ) {
        return $this->request("api/provideButton",[
            "fileProviderId"=>$fileProviderId,
            "directory"=>$directory,
            "tag"=>$tag,
            "systemTag"=>$systemTag,
            "buttonPrototypeId"=>$buttonPrototypeId
        ]);
    }

    /**
     * Get button by ID
     * @param $buttonId - Button ID
     * @return mixed
     */
    public function getButton($buttonId
    ) {
        $result = $this->request("api/getButtons",[
            "id"=>$buttonId,
        ]);
        if (isSet($result[0])) {
            return $result[0];
        } else {
            return null;
        }
    }

    /**
     * Get files by button ID
     * @param $buttonId - Button ID
     * @return mixed
     */
    public function getButtonFiles($buttonId
    ) {
        return $this->request("api/getFiles",[
            "buttonId"=>$buttonId,
        ]);
    }

    public function request($method,$params) {
        $s = curl_init();
        curl_setopt($s, CURLOPT_URL, "https://api.planeupload.com/".$method);
        curl_setopt($s, CURLOPT_HTTPHEADER, array("Accept: application/json",
            "Content-Type: application/json",
            "apiKey:" . $this->API_KEY));
        curl_setopt($s, CURLOPT_POST, 1);
        curl_setopt($s, CURLOPT_POSTFIELDS, json_encode($params));
        curl_setopt($s, CURLOPT_RETURNTRANSFER, true);
        $out = curl_exec($s);
        curl_close($s);
        return json_decode($out);
    }

    /**
     * Get button by ID
     * @param $buttonId - Button ID
     * @param $localFilePath - Local path to the file
     * @return mixed
     */
    public function uploadFile($buttonId,$localFilePath) {
        $params = ["fileName"=>basename($localFilePath),"buttonId"=>$buttonId];

        $s = curl_init();
        curl_setopt($s,CURLOPT_URL,"https://api.planeupload.com/api/uploadFile");
        curl_setopt($s,CURLOPT_HTTPHEADER,array("Accept: application/json",
            "Content-Type: multipart/form-data",
            "apiKey:".$this->API_KEY));
        curl_setopt($s, CURLOPT_POST, 1);
        curl_setopt($s, CURLOPT_POSTFIELDS, [
            'file'=>new \CurlFile($localFilePath),
            'requestData'=>json_encode($params)]);
        curl_setopt($s, CURLOPT_RETURNTRANSFER, true);
        $out = curl_exec($s);
        curl_close($s);
        return json_decode($out);
    }

}
