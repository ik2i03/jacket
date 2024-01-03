// Initialize Croppie instance and bind placeholder image
var croppieInstance = new Croppie(document.getElementById('croppie'), {
  viewport: { width: 250, height: 250 },
  boundary: { width: 300, height: 300 }
});

// 画像の初期バインド
croppieInstance.bind({
  url: "https://raw.githubusercontent.com/ik2i03/jacket/main/IMG_0314.PNG"
});

// 画像アップロードイベント
function onFileSelect() {
  var fileInput = document.getElementById('upload');
  var reader = new FileReader();
  reader.onload = function (e) {
    croppieInstance.bind({ url: e.target.result });
  };
  reader.readAsDataURL(fileInput.files[0]);
}

// ダウンロードボタンのクリックイベント
document.getElementById('download').addEventListener('click', function () {
  document.getElementById('loader').style.display = 'block';

  croppieInstance.result({
    type: 'blob',
    size: 'original',
    quality: 1,
    format: 'png'
  }).then(function (blob) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'cropped_image.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }).finally(function() {
    document.getElementById('loader').style.display = 'none';
  });
});
