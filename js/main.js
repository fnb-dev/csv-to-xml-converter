var inputFileName;

// Export xml
function doExport(selector, params) {
  var options = {
    //ignoreRow: [1,11,12,-2],
    //ignoreColumn: [0,-1],
    //pdfmake: {enabled: true},
    onBeforeSaveToFile: DoOnBeforeSaveToFile,
    onAfterSaveToFile: DoOnAfterSaveToFile,
    fileName: inputFileName, // exported file name
    tableName: 'Table name'
  };

  jQuery.extend(true, options, params);

  $(selector).tableExport(options);
}

// On before save file 
function DoOnBeforeSaveToFile (data, fileName, type, charset, encoding) {
    console.log("onBeforeSaveToFile: " + fileName )
}

// On after save file 
function DoOnAfterSaveToFile (data, fileName, type, charset, encoding) {
  console.log("onAfterSaveToFile: " + fileName);
}

(function($){
    $(function () {
        $("#upload").bind("click", function () {
            var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
            if (regex.test($("#fileUpload").val().toLowerCase())) {
                inputFileName = $('input[type=file]').val().replace(/C:\\fakepath\\/i, '');
                if (typeof (FileReader) != "undefined") {
                    $('.table-container').addClass('shown');
                    $('.upload-wrapper').hide();
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        console.log(e)
                        var table = $("<table id='xmltable' />");
                        var tbody = $("<tbody />");
                        var rows = e.target.result.split("\n");
                        for (var i = 0; i < rows.length; i++) {
                            table.append(tbody);
                            var row = $("<tr />");
                            var cells = rows[i].split(",");
                            if (cells.length > 1) {
                                for (var j = 0; j < cells.length; j++) {
                                    var cell = $("<td />");
                                    cell.html(cells[j]);
                                    row.append(cell);
                                }
                                tbody.append(row);
                            }
                        }
                        $("#dvCSV").html('');
                        $("#dvCSV").append(table);
                    }
                    reader.readAsText($("#fileUpload")[0].files[0]);
                } else {
                    alert("This browser does not support HTML5.");
                }
            } else {
                alert("Please upload a valid CSV file.");
            }
        });


        $('#exportXml').on('click', function(){
            console.log(inputFileName);
            let = liveTable = $('#xmltable').length;
            console.log(liveTable);

            //alert($('#xmltable').text());
            doExport('#xmltable', {
                type:'excel',
                mso: {
                    fileFormat:'xmlss',
                    worksheetName: ['Table 1','Table 2', 'Table 3']
                }
            });
            $('.upload-wrapper').show();
            $('.table-container').removeClass('shown');
        })

    });
}(jQuery))