<div x-data="{ open: false }" id="contact">
    <button @click="open = true" class="inline-flex items-center h-10 xl:h-12 px-6 xl:px-8 rounded-full text-sm font-medium bg-blue text-white">
        Contact Us
    </button>

    <div
        x-show="open"
        @click.away="open = false"
        class="fixed right-0 top-0 z-10 flex flex-col w-4/5 xl:w-3/5 h-full overflow-auto px-24 bg-indigo"
        x-transition:enter="transition ease-out duration-700"
        x-transition:enter-start="transform translate-x-full"
        x-transition:enter-end="transform translate-x-0"
        x-transition:leave="transition ease-out duration-300"
        x-transition:leave-start="transform translate-x-0"
        x-transition:leave-end="transform translate-x-full"
    >
        <button @click="open = false" class="absolute right-0 mr-12 mt-12">
            <span class="block w-6 h-3px bg-white transform rotate-45"></span>
            <span class="block w-6 h-3px bg-white transform -rotate-45 -mt-1"></span>
        </button>
        <div class="py-12">
            <h2 class="mb-5 text-5xl text-white font-medium">
                Let's talk!
            </h2>
            <div class="mb-5 p-5 border-l-2 border-white">
                <span class="text-white opacity-50">Want to chat? Shoot us an email at</span>
                <a class="text-white" href="mailto:hello@hackdawg.com">hello@hackdawg.com</a>
            </div>
            <div class="w-3/4">
                @if ($message = session('message'))
                    <p class="text-white">{{ $message }}</p>
                @else
                    <form wire:submit.prevent="submit">
                        <div class="form-group">
                            <label class="label" for="name">Name</label>
                            <input
                                wire:model="name"
                                class="input"
                                type="text"
                                id="name"
                                placeholder="John"
                            >
                            @error('name')
                                <span class="mt-1 text-red">{{ $message }}</span>
                            @enderror
                        </div>

                        <div class="form-group">
                            <label class="label" for="email">Email</label>
                            <input
                                wire:model="email"
                                class="input"
                                type="email"
                                id="email"
                                placeholder="john@hackdawg.com"
                            >
                            @error('email')
                                <span class="mt-1 text-red">{{ $message }}</span>
                            @enderror
                        </div>

                        <div class="form-group">
                            <label class="label" for="message">Message</label>
                            <textarea
                                wire:model="message"
                                class="input"
                                id="message"
                                placeholder="We need help to redesign our chatbot..."
                                rows="3"
                            ></textarea>
                            @error('message')
                                <span class="mt-1 text-red">{{ $message }}</span>
                            @enderror
                        </div>

                        <button class="relative mx-3 px-2 text-white font-medium uppercase" type="submit">
                            Send Message
                            <span class="absolute left-0 bottom-0 -z-1 bg-red w-full h-3px mb-2"></span>
                        </button>
                    </form>
                @endif
            </div>
        </div>
    </div>
</div>
