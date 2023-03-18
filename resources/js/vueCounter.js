import { ref, onMounted } from 'vue'

export default function vueCounter(){

    let counter = ref(0)

    onMounted(()=>{
        setInterval(()=>{
            counter.value++
        }, 1000)
    })

    return counter
}