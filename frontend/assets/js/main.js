const uri = 'http://localhost:8084/';
let componentSelect = document.getElementById('divClient');
let componentDownload = document.getElementById('btnDownload');

$.ajax({
    type: 'GET',
    url: uri + 'api/sepomex/company',
    beforeSend: function(xhr) {
        document.getElementById('txtReport').value = '';
        document.getElementById('imgClient').style.display = 'none';
        componentDownload.classList.remove = 'btn-primary';
    },
    error: function(request, status, error) {
        swal(`* Incidencia ${error}`);
    },
    dataType: 'json'
}).done(function(data) {
    let htmlResult = '';
    let select = document.getElementById('divClient')
    // for (var i = 0; i < data.length; i++) {
    //     let option = document.createElement('option');
    //     option.value = data[i].Id;
    //     option.text = data[i].Cliente;
    //     select.appendChild(option);
    // }

    data.map(x => {
        let option = document.createElement('option');
        option.value = x.Id;
        option.text = x.Cliente;
        option.setAttribute('data-image', `./assets/images/${x.Images}`);
        select.appendChild(option);
    });
});
// =============================================================================================================
// events
componentSelect.addEventListener('change', function(event) {
    let source = this.selectedOptions[0].getAttribute('data-image');
    let img = document.getElementById('imgClient');
    const idItem = this.value;
    img.style.display = 'inline';
    img.src = source;

    // start event ajax
    $.ajax({
        type: 'GET',
        url: `${uri}api/sepomex/report/${idItem}`,
        beforeSend: function(xhr) {
            document.getElementById('txtReport').value = '';
        },
        error: function(request, status, error) {
            swal(`* Incidencia ${error}`);
        }
    }).done(function(data) {
        console.dir(data);
        document.getElementById('txtReport').value = data;
        componentDownload.classList.add(`btn-primary`);
        componentDownload.text = 'Descargar';
        componentDownload.href = `${uri}api/sepomex/report/${idItem}`;
    });
    // end event ajax
}, true);

// componentDownload.addEventListener('click', function() {
//     alert('ok');
// },true);