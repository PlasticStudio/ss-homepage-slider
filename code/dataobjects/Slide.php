<?php

class Slide extends DataObject {

	private static $db = array(
		'Title' => 'Varchar(255)',
		'Text' => 'HTMLText',
		'ExternalLink' => 'Text',
		'LinkText' => 'Varchar(255)',
		'TextColor' => 'Varchar(255)',
		'SortID' => 'Int'
	);
	
	private static $has_one = array(
		'HomePage' => 'HomePage',
		'Page' => 'SiteTree',
		'Image' => 'Image'
	);
	
	private static $default_sort = 'SortID';
	
	// Summary fields 
	private static $summary_fields = array( 
		'Image.CMSThumbnail' => 'Image',
		'Title' => 'Title',
		'Page.Title' => 'Internal page link',
		'ExternalLinkURL' => 'External Link URL'
	);
	
	public function getCMSFields() {
		
		return FieldList::create(

			new TabSet(
				$name = "Root",
				new Tab(
					$title = 'Main',
					TextField::create('Title', 'Title'),
					TextareaField::create('Text', 'Text'),
					DropdownField::create(
						'TextColor',
						'Text color',
						array(
							'dark' => 'Dark',
							'light' => 'Light'
						)
					)//->setEmptyString('(Please select)')
				),
				new Tab(
					$title = 'Links',
					TreeDropdownField::create('PageID', 'Internal page link', 'SiteTree'),
					TextField::create('ExternalLink', 'External link'),
					TextField::create('LinkText', 'Link Text')
				),
				new Tab(
					$title = 'Images',
					UploadField::create('Image', 'Image')->setFolderName('Slides')
				)
			)
		
		);
    }
	
	function Link(){
		if($this->PageID > 0) return $this->Page()->Link();
		if($this->ExternalLink) return $this->ExternalLink;
		return false;
	}

}