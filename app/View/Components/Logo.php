<?php

namespace App\View\Components;

use Illuminate\View\Component;

class Logo extends Component
{
    /**
     * It can be: black, indigo.
     *
     * @var string
     */
    protected $color;

    /**
     * Whether to load a rounded variant.
     *
     * @var bool
     */
    protected $rounded;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($color, $rounded = false)
    {
        $this->color = $color;
        $this->rounded = $rounded;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\View\View|string
     */
    public function render()
    {
        $roundedLogos = [
            'black' => asset('png/logos/black-circle.png'),
            'indigo' => asset('png/logos/indigo-circle.png'),
        ];

        $defaultLogos = [
            'black' => asset('png/logos/black.png'),
            'indigo' => asset('png/logos/indigo.png'),
        ];

        return view('components.logo', [
            'rounded' => ($rounded = $this->rounded),
            'image_url' => $rounded ? $roundedLogos[$this->color] : $defaultLogos[$this->color],
        ]);
    }
}
