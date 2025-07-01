const fileInput = document.getElementById('fileInput');
const preview = document.getElementById('preview');
const form = document.getElementById('photo-form');
let fileList = [];

fileInput.addEventListener('change', () => {
const file = fileInput.files[0];
if (file) {
    if (file.size > 5 * 1024 * 1024) {  // 大于5MB
        alert('File size must be less than 5MB.');
        return;
    }
    fileList.push(file);
    renderPreview();
    fileInput.value = ''; // 清空 input，允许重复上传
}
});

function renderPreview() {
preview.innerHTML = '';
fileList.forEach((file, index) => {
    const div = document.createElement('div');
    div.style.marginBottom = '5px';
    div.innerHTML = `
    ${file.name}
    <button type="button" onclick="removeFile(${index})">Remove</button>
    `;
    preview.appendChild(div);
});
}

window.removeFile = function(index) {
fileList.splice(index, 1);
renderPreview();
}

form.addEventListener('submit', function (e) {
e.preventDefault();

const formData = new FormData(form);
fileList.forEach((file, i) => {
    formData.append('attachment', file); 
});

fetch(form.action, {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
}).then(response => {
    if (response.ok) {
    alert('Submission successful!');
    form.reset();
    fileList = [];
    renderPreview();
    } else {
    alert('Submission failed.');
    }
});
});
