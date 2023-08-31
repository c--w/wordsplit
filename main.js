onload = (event) => init();
var all_guess_words;
var parts;
var undo_stack_elem = [];
var last_time = 0;
var total_time = 0;
var games = 0;
var start_time = 0;
var seed;
var startseed;
var gamemode;
var level;
var last_selected;
var words;
function init() {
    let all_words_div = document.querySelector("#all_words_div");
    all_words_div.onmousedown = (event) => handleClick(event);
    all_words_div.ontouchstart = (event) => handleClick(event);
    initSeed();
    if (!gamemode) {// try cookie
        gamemode = Number(getCookie("gamemode"));
        level = Number(getCookie("level"));
    }
    if (isNaN(gamemode)) { // try select
        gamemode = $("#gamemode").val();
        level = $("#level").val();
    }
    if (gamemode < 5)
        gamemode = 8;
    if (level < 1)
        level = 1;
    $("#gamemode").val(gamemode);
    $("#level").val(level);
    setCookie("gamemode", gamemode, 730);
    setCookie("level", level, 730);
    $("#gamemode").on("change", changeGame);
    $("#level").on("change", changeGame);
    changeGame();
}

function changeGame() {
    gamemode = Number($("#gamemode").val());
    words = gamemode * 2;
    setCookie("gamemode", gamemode, 730);
    level = $("#level").val();
    setCookie("level", level, 730);
    setup_dw();
    last_time = 0;
    total_time = 0;
    games = 0;
    start_time = 0;
    setBckg();
    initGame();
}

function initGame() {
    startseed = seed;
    let seed_url;
    seed_url = gamemode + "-" + level + "-" + startseed;

    var url = window.location.origin + window.location.pathname + "#" + seed_url;
    $("#share-url").val(url);
    $("#seed").attr('title', startseed);
    undo_stack_elem.length = 0;
    findAllGuessWords();
    updateStats();
    start_time = Date.now();
}

function findAllGuessWords() {
    do {
        all_guess_words = [];
        let word = getRandomWord(5, "");
        all_guess_words.push(word.join(''));
        let pos = 2;
        let l = 5;
        let part = word.slice(pos);
        all_guess_words = findNextWord(part.join(''), l, [...all_guess_words])
    } while (!all_guess_words)
    console.table(all_guess_words);
    parts = [];
    for (let i = 0; i < all_guess_words.length; i += 2) {
        word = cdl(all_guess_words[i]);
        if (word.length == 4) {
            pos = 2;
        } else if (word.length == 5) {
            pos = 2;
        } else if (word.length == 6) {
            pos = 3;
        } else if (word.length == 7) {
            pos = 3;
        }
        let part1 = word.slice(0, pos);
        let part2 = word.slice(pos);
        parts.push(part1.join(''), part2.join(''))
    }
    console.table(parts);
    parts.sort(randomsort);
    fillParts();
}

function fillParts() {
    $('#all_words_div').empty();
    $('#all_words_div').append($("<i></i>"));
    parts.forEach(part => {
        let div = $('<div>' + part + '</div>');
        div.addClass('part');
        div.data('t', part);
        $('#all_words_div').append(div);
    })
}

function findNextWord(part_, l_, all_words_) {
    let big_count = 0;
    while (big_count < 10) {
        let all_words = [...all_words_]
        let count = 0;
        let word;
        do {
            word = getRandomWord(l_, part_);
            count++;
        } while (word && all_words.indexOf(word.join('')) != -1 && count < 100)
        if (count == 100 || !word) {
            return null;
        }
        all_words.push(word.join(''));
        if (all_words.length == words)
            return all_words;
        if (word.length == 4) {
            l = 5;
        } else if (word.length == 5) {
            l = 6;
        } else if (word.length == 6) {
            l = 7;
        } else if (word.length == 7) {
            l = 6;
        }
        let pos = part_.length || 2;
        let part = word.slice(pos);
        let all_words_child = findNextWord(part.join(''), l, all_words);
        if (all_words_child) {
            return all_words_child;
        } else if (all_words.length % 2 == 0) {
            return findNextWord('', 5, all_words);
        } else {
            big_count++;
        }
    }
    return null;
}

var click_time = 0;
function handleClick(event) {
    if (event.stopPropagation) {
        event.stopPropagation();
        event.preventDefault();
    }
    if (Date.now() - click_time < 100)
        return false;
    click_time = Date.now();
    let el = $(event.target);
    if (el.hasClass('part')) {
        effect(el);
        if (el.hasClass('selected')) {
            el.removeClass('selected')
            return;
        }
        if ($('div.selected').length == 0) {
            el.addClass('selected');
            return;
        }
        let first_el = $($('div.selected')[0])
        el.addClass('selected');
        setTimeout(() => {
            let word = first_el.data('t') + el.data('t');
            $('div.selected').removeClass('selected')
            if (!dw.find(w => w == word)) {
                return;
            }
            let word_disp =  '<span>'+first_el.data('t')+'</span><span>'+el.data('t')+'</span>'
            first_el.html(word_disp);
            el.hide();
            undo_stack_elem.push(first_el[0], el[0]);
            first_el.removeClass('part');
            first_el.addClass('solved');
            if ($('div.solved').length == words / 2) {
                $('div.solved').addClass('winner2');
                games++;
                last_time = Math.round((Date.now() - start_time) / 1000);
                total_time += last_time;
                setTimeout(() => {
                    initGame();
                }, 2000)
            }
        }, 500)
    }
    if (el.hasClass('solved')) {
        let ind = undo_stack_elem.findIndex(elem => elem == el[0]);
        let second_el = $(undo_stack_elem[ind + 1]);
        second_el.show();
        el.text(el.data('t'));
        el.removeClass('solved');
        el.addClass('part');
        undo_stack_elem.splice(ind, 2);
    }
}
function undo() {
    if (undo_stack_elem.length == 0)
        return;
    let el = $(undo_stack_elem.pop());
    el.show();
    el = $(undo_stack_elem.pop());
    el.text(el.data('t'));
    el.removeClass('solved');
    el.addClass('part');
}

function updateStats() {
    $("#games").text(games);
    $("#last").text(last_time);
    $("#total").text(total_time);
    if (!games)
        return;
    let avg = Math.round(total_time / games);
    $("#avg").text(avg);
    let key = 'words' + games + '-' + gamemode + '-' + level;
    let best = localStorage.getItem(key);
    if (best) {
        best = Number(best);
        if (avg < best) {
            best = avg;
        }
    } else {
        best = avg;
    }
    localStorage.setItem(key, best);
    $("#best-games").text(games);
    $("#best").text(best);
}

function randomsort(a, b) {
    return Math.random() * 2 - 1;
}

function rand() {
    seed++;
    let t = seed + 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
}

function initSeed() {
    if (window.location.hash) {
        let tmp = window.location.hash.substring(1).split("-");
        gamemode = Number(tmp[0])
        level = Number(tmp[1])
        seed = Number(tmp[2]);
        if (!isNaN(seed))
            return;
    }
    let now = new Date();
    seed = now.toISOString().replaceAll("-", "").replaceAll("T", "").replaceAll(":", "").substring(2, 12);
    seed = Number(seed + '0000');
}


var dw;
function setup_dw() {
    if (level == 1) dw = hrdict1;
    else if (level == 2) dw = hrdict2;
    else if (level == 3) dw = hrdict3;
    else if (level == 4) dw = endict;
}

function getRandomWord(len, part) {
    if (!part)
        part = '';
    let filtered = dw.filter((word) => {
        let word2 = cdl(word);
        if (!word.startsWith(part))
            return false;
        if (word2.length == len || word2.length > 5 && word2.length == len - 1)
            return true;
    });
    if (filtered.length == 0)
        return null;
    let i = Math.floor(rand() * filtered.length);
    let word = filtered[i];
    return cdl(word);
}

function setBckg() {
    var color = (Math.random() * 20 + 235 << 0).toString(16) + (Math.random() * 20 + 235 << 0).toString(16) + (Math.random() * 20 + 235 << 0).toString(16);
    var url = "https://bg.siteorigin.com/api/image?2x=0&blend=40&color=%23" + color + "&intensity=10&invert=0&noise=0&pattern=" + g_patterns[Math.floor(Math.random() * g_patterns.length)];
    $('body').css('background-image', 'url(' + url + ')');
}

function effect(el) {
    el.addClass('effect');
    setTimeout((el) => el.removeClass('effect'), 100, el);
}
