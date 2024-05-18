function searchText() {
    var input, filter, paragraph, text, found;

    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    paragraph = document.getElementById('paragraph');
    text = paragraph.innerText.toUpperCase();
    found = text.indexOf(filter);

    if (found > -1) {
        paragraph.innerHTML = text.substring(0, found) + "<span class='highlight'>" + text.substring(found, found + filter.length) + "</span>" + text.substring(found + filter.length);
    } else {
        alert('Word not found!');
    }
}
