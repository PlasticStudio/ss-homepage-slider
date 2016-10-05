<?php

define('HOMEPAGESLIDER_DIR', basename(dirname(__FILE__)));

if(class_exists('HomePage')){
	DataObject::add_extension('HomePage', 'HomePageExtension');
}

if(class_exists('HomePage_Controller')){
	DataObject::add_extension('HomePage_Controller', 'HomePage_ControllerExtension');
}