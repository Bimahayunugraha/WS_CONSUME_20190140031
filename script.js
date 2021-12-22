function show(){
    let url = "http://localhost:8080/datamahasiswa/viewwithjson";
    fetch(url)
    .then((response) => {return response.json();})
    .then((result) => {
        var tabel = document.createElement("table");
        tabel.setAttribute("id", "tabel")
        tabel.setAttribute("class", "table my-4")
        tabel.createTHead()
        for(var i = 0; i < result.length; i++) {
            var t = tabel.insertRow()
            for(var j = 0; j < Object.keys(result[0]).length; j++) {
                var a = t.insertCell()
                a.innerHTML = result[i][Object.keys(result[i])[j]]
            }
        }

        var divShowData = document.getElementById('showdata');
        divShowData.innerHTML = "";
        divShowData.appendChild(tabel);

        $("#tabel").find("thead").append("<tr><th>NIM</th><th>Nama</th><th>Alamat</th><th>Program Studi</th><th>Fakultas</th></tr>")
    });
 
}


$('#search').keyup(function() {
    $.getJSON("http://localhost:8080/datamahasiswa/viewwithjson", (data) => {
            var search = $('#search').val();
            if (search === '') {
                $('#kartu').html('');
                return;
            }
            var regex = new RegExp(search, 'i');
            var output = '<div class="row">';
            var count = 1;
            $.each(data, function (key, val) {
                if ((val.nim.search(regex)) !== -1 || (val.nama.search(regex)) !== -1) {
                    output += `<div class="col-md-6 mb-3">`;
                    output += `<div class="card bg-light rounded-3 border-dark mb-3">`;
                    output += `<div class="card-header bg-dark text-white">Data Mahasiswa</div>`;
                    output += `<div class="card-body">`;
                    output += `<p class="card-text" nim="${key}">NIM : ${val.nim} </p>`;
                    output += `<p class="card-text" nim="${key}">Nama : ${val.nama}</p>`;
                    output += `<p class="card-text" nim="${key}">Fakultas : ${val.fakultas}</p>`;
                    output += `<p class="card-text" nim="${key}">Program Studi : ${val.programstudi}</p>`;
                    output += `<p class="card-text" nim="${key}">Alamat : ${val.alamat}</p>`;
                    output += `</div>`;
                    output += `</div>`;
                    output += `</div>`;
                    if(count%2 == 0){
                        output += '</div><div class="row">'
                    }
                    count++;
                }
            });
            output += '</div>';
            $('#kartu').html(output);
        });
});


function hide() {
    $("#tabel").remove();
}