<?php

/**
 * @Author: Administrator
 * @Date:   2019-10-11 16:09:45
 * @Last Modified by:   Administrator
 * @Last Modified time: 2019-10-11 17:43:36
 */
$image = $_FILES['file'];
var_dump($_FILES['file']);
//截取文件后缀名
$type = strrchr($image['name'], ".");

//设置上传路径，我把它放在了upload下的interview目录下（需要在linux中给interview设置文件夹权限）
$path = "upload/" . $image['name']; 
if(move_uploaded_file($image['tmp_name'], $path)){
  echo "上传成功";
} else{
  echo "上传失败";
};
