<template>
  <div id="app">
    <div >    
        <ion-vue-router main></ion-vue-router>   
    </div>
  </div>
</template>
<script>

export default {
   name:"app"
  
}
  
</script>

<style>
:root {
  --ion-color-new: #69bb7b;
  --ion-color-new-rgb: 105,187,123;
  --ion-color-new-contrast: #ffffff;
  --ion-color-new-contrast-rgb: 255,255,255;
  --ion-color-new-shade: #5ca56c;
  --ion-color-new-tint: #78c288;

  --ion-color-purple: #726a95;
  --ion-color-purple-rgb: 105,187,123;
  --ion-color-purple-contrast: #ffffff;
  --ion-color-purple-contrast-rgb: 255,255,255;
  --ion-color-purple-shade: #5ca56c;
  --ion-color-purple-tint: #726a95;

    --ion-color-darkBlue: #00003f;
  --ion-color-darkBlue-rgb: 0, 0, 83;
  --ion-color-darkBlue-contrast: #000020 ;
  --ion-color-darkBlue-contrast-rgb: 0, 0, 32;
  --ion-color-darkBlue-shade: #000082;
  --ion-color-darkBlue-tint: #a9a9ff;

}

.ion-color-lightGreen {
  --ion-color-base: var(--ion-color-new);
  --ion-color-base-rgb: var(--ion-color-new-rgb);
  --ion-color-contrast: var(--ion-color-new-contrast);
  --ion-color-contrast-rgb: var(--ion-color-new-contrast-rgb);
  --ion-color-shade: var(--ion-color-new-shade);
  --ion-color-tint: var(--ion-color-new-tint);
}

.ion-color-darkBlue {
  --ion-color-base: var(--ion-color-darkBlue);
  --ion-color-base-rgb: var(--ion-color-darkBlue-rgb);
  --ion-color-contrast: var(--ion-color-darkBlue-contrast);
  --ion-color-contrast-rgb: var(--ion-color-darkBlue-contrast-rgb);
  --ion-color-shade: var(--ion-color-darkBlue-shade);
  --ion-color-tint: var(--ion-color-darkBlue-tint);
}

.ion-color-purple {
  --ion-color-base: var(--ion-color-purple);
  --ion-color-base-rgb: var(--ion-color-purple-rgb);
  --ion-color-contrast: var(--ion-color-purple-contrast);
  --ion-color-contrast-rgb: var(--ion-color-purple-contrast-rgb);
  --ion-color-shade: var(--ion-color-purple-shade);
  --ion-color-tint: var(--ion-color-purple-tint);
}

.borderRad-20{
    --border-radius:20px
}

.borderRad-40{
    --border-radius:40px
}

.btn-hover{
  --button-color-hover:var(--ion-color-purple)!important;
}

</style>
