<?php

namespace App\View\Components;

use Illuminate\View\Component;

class Avatar extends Component
{
    /**
     * The url of the image to use, it must be absolute.
     *
     * @var string|null
     */
    public $url;

    /**
     * It can be: sm, md, lg
     *
     * @var string
     */
    public $size;

    /**
     * Create a new component instance.
     *
     * @param string|null $url
     * @param string $size
     */
    public function __construct($url = null, $size = 'md')
    {
        $this->url = $url;
        $this->size = $size;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\View\View|string
     */
    public function render()
    {
        return view('components.avatar');
    }
}
