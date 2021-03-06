<?php


class Question extends Eloquent {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'questions';

	public function qcm()
	{
	  return $this->belongsTo('Qcm');
	}

	public function answers() 
	{
		return $this->hasMany('Answer');
	}
}
