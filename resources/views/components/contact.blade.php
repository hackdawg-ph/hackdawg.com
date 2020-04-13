<div x-data="{ open: false }" id="contact">
    {{ $slot }}
    <div
        x-show="open"
        @click.away="open = false"
        class="fixed right-0 top-0 z-10 flex flex-col justify-center w-3/5 h-full px-24 bg-indigo"
        x-transition:enter="transition ease-out duration-700"
        x-transition:enter-start="transform translate-x-full"
        x-transition:enter-end="transform translate-x-0"
        x-transition:leave="transition ease-out duration-300"
        x-transition:leave-start="transform translate-x-0"
        x-transition:leave-end="transform translate-x-full"
    >
        <button @click="open = false" class="ml-auto">
            <span class="block w-6 h-3px bg-white transform rotate-45"></span>
            <span class="block w-6 h-3px bg-white transform -rotate-45 -mt-1"></span>
        </button>
        <h2 class="mb-5 text-5xl text-white font-medium">
            Let's talk!
        </h2>
        <div class="mb-5 p-5 border-l-2 border-white">
            <span class="text-white opacity-60">Want to chat? Shoot us an email at</span>
            <a class="text-white" href="mailto:hello@hackdawg.com">hello@hackdawg.com</a>
        </div>
        <div class="w-3/4">
            <form method="POST" action="{{ route('contact') }}">
                @csrf
                <div class="form-group">
                    <label class="label" for="name">Name</label>
                    <input 
                        class="input" 
                        type="text" 
                        name="name" 
                        id="name"
                        placeholder="John"
                        required
                    >
                </div>

                <div class="form-group">
                    <label class="label" for="email">Email</label>
                    <input 
                        class="input" 
                        type="email" 
                        name="email" 
                        id="email"
                        placeholder="john@hackdawg.com"
                        required
                    >
                </div>

                <div class="form-group">
                    <label class="label" for="message">Message</label>
                    <textarea 
                        class="input" 
                        name="message" 
                        id="message"
                        placeholder="We need help to redesign our chatbot..."
                        rows="3"
                    ></textarea>
                </div>

                <button class="relative mx-3 px-2 text-white font-medium uppercase" type="submit">
                    Send Message
                    <span class="absolute left-0 bottom-0 -z-1 bg-red w-full h-3px mb-2"></span>
                </button>
            </form>
        </div>
    </div>
</div>