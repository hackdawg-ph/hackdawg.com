<?php

namespace App\View\Components;

use Illuminate\View\Component;

class Layout extends Component
{
    /**
     * The layout variant.
     * Can be: primary, secondary
     *
     * @var string
     */
    public $variant;

    /**
     * Create the component instance.
     *
     * @param  string  $variant
     * @return void
     */
    public function __construct($variant = 'primary')
    {
        $this->variant = $variant;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\View\View|string
     */
    public function render()
    {
        return view('components.layout');
    }
}
