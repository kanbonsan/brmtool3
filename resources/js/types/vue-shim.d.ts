declare module "*.vue" {
    import { defineComponent } from "vue";
    const component: DefineComponent<{}, {}, any>; //ReturnType<typeof defineComponent>;
    export default component;
}
