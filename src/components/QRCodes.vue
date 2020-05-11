<template>
	<div>
 　　<div id="code">
	   <canvas id="canvas"></canvas>
     </div>
 　　</div>
</template>

<script>
	import QRCode from 'qrcode'
 export default {
	 name : 'QRCodes',
 data () {
   return { codes: '' }
  },
   components: {
       QRCode
   },
   methods: {
         useqrcode () {
              var canvas = document.getElementById('canvas')
              QRCode.toCanvas(canvas, 'https://sqzl.gz96333.org/apk.apk', function (error) {
                   if (error) console.error(error)
               console.log('success!')
             })
         }
     },
     mounted  () {
         this.useqrcode()
     }
 }
</script>

<style>
</style>
