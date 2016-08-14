characters_to_phonetics_json = '';
phonetics_to_characters_json = '';

function csv2json(csv)
{
	var rows = csv.split('\r\n');
	if (rows.length === 1)
	{
		rows = csv.split('\n');
	}
	var json = {};
	for (var i = 1; i < rows.length; ++i)
	{
		try
		{
			var row = rows[i].split(',');

			var key = row[0];
			if (key === undefined)
				continue;
			key = key.replace(/"/g, '');

			var value = row[1];
			if (value === undefined)
				continue;
			value = value.replace(/"/g, '');

			json[key] = value;
		}
		catch (e)
		{
		}
	}
	return json;
}

$.get( "./char2phon.csv", function( data1 ) {
	characters_to_phonetics_json = csv2json(data1);
	$.get( "./phon2char.csv", function( data2 ) {
		phonetics_to_characters_json = csv2json(data2);
	});
});


function do_characters_to_phonetics()
{
	var json = characters_to_phonetics_json;
	var characters = $("#input").val();
	var phonetics = '';
	var characters_phonetics_mixed = '';

	for (var i = 0; i < characters.length; ++i)
	{
		try
		{
			var current_characters = characters[i];
			phonetics += ' ';
			var current_phonetics = json[current_characters];
			if (current_phonetics === undefined)
				current_phonetics = '';
			phonetics += current_phonetics;

			characters_phonetics_mixed += ' ' + current_characters + current_phonetics;
		}
		catch (e)
		{
		}
	}

	phonetics = phonetics.trim();
	characters_phonetics_mixed = characters_phonetics_mixed.trim();

	if ($('#comparison').is(':checked'))
		$("#output").val(characters_phonetics_mixed);
	else
		$("#output").val(phonetics);
	return;
}

function do_phonetics_to_characters()
{
	var json = phonetics_to_characters_json;
	var phonetics = $("#input").val();
	var phonetics_list = phonetics.split(' ');
	var characters = '';
	var phonetics_characters_mixed = '';

	for (var i = 0; i < phonetics_list.length; ++i)
	{
		try
		{
			var current_phonetics = phonetics_list[i].trim();
			var current_characters = json[current_phonetics];
			if (current_characters === undefined)
				current_characters = '';
			characters += current_characters;
			characters += '\n';
			phonetics_characters_mixed += current_phonetics + ' ' + current_characters + '\n';
		}
		catch (e)
		{
		}
	}

	phonetics_characters_mixed = phonetics_characters_mixed.trim()
	characters = characters.trim();

	if ($('#comparison').is(':checked'))
		$("#output").val(phonetics_characters_mixed);
	else
		$("#output").val(characters);
	return;
}
