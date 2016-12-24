characters_to_phonetics_json = '';
phonetics_to_characters_json = '';

$.getJSON( "./char2phon.json", function( data1 ) {
	characters_to_phonetics_json = (data1);
	$.getJSON( "./phon2char.json", function( data2 ) {
		phonetics_to_characters_json = data2;
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
	var phonetics_list = phonetics.split(/[^A-Za-z]+/);
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
