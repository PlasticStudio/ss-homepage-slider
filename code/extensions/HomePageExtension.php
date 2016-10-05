<?php
class HomePageExtension extends DataExtension {

	private static $db = array(
		'AutoSlide' => 'Boolean',
		'IncludeCSS' => 'Boolean'
	);

	private static $has_many = array(
		'Slides' => 'Slide'
	);
	
	public function updateCMSFields(FieldList $fields) {
		$fields->addFieldToTab('Root.Slider', CheckboxField::create('AutoSlide', 'Cycle through slides automatically every 5 seconds'));
		$fields->addFieldToTab('Root.Slider', CheckboxField::create('IncludeCSS', 'Include slider CSS file in requirements'));
		$fields->addFieldToTab(
			'Root.Slider', 
			new GridField(
				'Slides', 
				'Slides', 
				$this->owner->Slides(), 
				GridFieldConfig_RecordEditor::create(10)->addComponent(new GridFieldSortableRows('SortID'))
			)
		);
	}

}

class HomePage_ControllerExtension extends Extension {

	public function onBeforeInit(){
		Requirements::javascript(THIRDPARTY_DIR.'/jquery/jquery.js');
		Requirements::javascript(HOMEPAGESLIDER_DIR.'/js/homepage-slider.js');
		if($this->owner->IncludeCSS){
			Requirements::css(HOMEPAGESLIDER_DIR.'/css/homepage-slider.css');
		}
	}

}