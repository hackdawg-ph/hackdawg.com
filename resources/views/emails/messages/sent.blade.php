@component('mail::message')

Hello Hackdawg, 

{{ $data['name'] }} said "{{ $data['message'] }}".

@endcomponent
