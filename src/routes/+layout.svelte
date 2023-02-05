<script lang="ts">
    import { onMount } from 'svelte';
   import { supabaseClient } from '$lib/supabase'
	import '../app.postcss';
	import { invalidateAll } from '$app/navigation';

    onMount(() => {
        const {
            data: { subscription }
        } = supabaseClient.auth.onAuthStateChange(() => {
            console.log('Auth state change detected')
            invalidateAll();
        });

        return () => {
            subscription.unsubscribe();
        };
    });

</script>

<slot />