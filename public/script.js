getData();
async function getData(){
    const response = await fetch('/read');
    const json = await response.json();
    console.log(json);
    showData(json);
}

const btnSave = document.getElementById('btn_save');
btnSave.addEventListener('click', async event => {

    const action = btnSave.textContent;

    const Nama_Makanan    = document.getElementById('Nama_Makanan').value;
    const Harga   = document.getElementById('Harga').value;

    let data = {
        Nama_Makanan : Nama_Makanan,
        Harga : Harga,
        action : action
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    const response = await fetch('/api', options);
    const json = await response.json();
    console.log(json);
    
    getData();

    $('#exampleModal').modal('hide');

    if(action === 'Simpan'){
        $.alert('Data Berhasil ditambah!');
    }else{
        $.alert('Data Berhasil dirubah!');
    }
});

function showData(json){
    let tr = '';
    $('#databody').html('');
    let no;
    for (let i = 0; i < json.length; i++) {
        no = i + 1;
        tr = $('<tr/>');
        tr.append("<td>" + no + "</td>");
        tr.append("<td>" + json[i].Nama_Makanan + "</td>");
        tr.append("<td>" + json[i].Harga + "</td>");
      
        tr.append(`
            <td>
                <button type="button" class="badge badge-primary badge-pill btnEdit" data-Nama_Makanan="`+ json[i].Nama_Makanan +`">
                    Edit
                </button>
                <button type="button" class="badge badge-danger badge-pill btnHapus" data-Nama_Makanan="`+ json[i].Nama_Makanan +`">
                    Hapus
                </button>
            </td>`
        );
        $('#databody').append(tr);
    }

    //Jquery Selector
    $(function(){
        $('.btnTambahData').on('click', function(){
            document.getElementById('Nama_Makanan').readOnly = false;
            document.getElementById('Nama_Makanan').value = '';
            document.getElementById('Harga').value = '';

            $('#exampleModalLabel').html('Tambah Data Siswa');
            $('.modal-footer button[id=btn_save]').html('Simpan');
        });

        $('.btnEdit').on('click', async function(){
            let nis = $(this).data('nis');
            console.log(nis);


            const url = `readbynis/${nis}`;
            const response = await fetch(url);
            const json = await response.json();
            console.log(json[0].nis);

            document.getElementById('Nama_Makanan').readOnly = true;
            document.getElementById('Nama_Makanan').value = json[0].Nama_Makanan;
            document.getElementById('Harga').value = json[0].Harga;

            $('#exampleModalLabel').html('Ubah Data Siswa');
            $('.modal-footer button[id=btn_save]').html('Ubah Data');
            $('#exampleModal').modal('show');
        });

        $('.btnHapus').on('click', async function(){
            let nis = $(this).data('nis');

            $.confirm({
                title: 'Hapus Data Siswa',
                content: 'Apakah Anda Yakin...???',
                buttons: {
                    ya: {
                        text: 'YA',
                        btnClass: 'btn-blue',
                        action: async function(){
                            const url = `hapus/${nis}`;
                            const response = await fetch(url);
                            const json = await response.json();
                            $.alert('Data Berhasil dihapus!');
                            getData();
                        }
                    },
                    tidak: function () {
                        
                    }
                }
            });
        });
    })
}

