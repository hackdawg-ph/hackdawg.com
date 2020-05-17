<div
    class="{{
        cx('overflow-hidden rounded-full bg-gray-lightest', [
            'w-8 h-8' => $size === 'sm',
            'w-10 h-10' => $size === 'md',
            'w-12 h-12' => $size === 'lg',
        ])
    }}"
>
    @if ($url)
        <img class="w-full h-full object-cover object-center" src="{{ $url }}" alt="">
    @else
        <svg class="w-full h-full text-gray" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"/>
        </svg>
    @endif
</div>
