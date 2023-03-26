const account = JSON.parse(localStorage.getItem('abs_account'));

function playlist() {
    if(account.playlists.length === 0) {
        $('#popup-body').html(`
            <p>Subscribe to a playlist</p>
        `);
    } else {
        for(let i = 0; i < account.playlists.length; i++) {            
            let { playlist_title, videos }  = account.playlists[i];
            $('#popup-body').append(`<div class="bg-secondary text-bg-secondary p-1 border-top border-bottom title-bar" index="${i}">
                ${playlist_title}
            </div>
            <ul class="playlist" id="playlist-${i}"></ul>`);
            for(let j = 0; j < videos.length; j++) {
                if(!videos[j].watched)
                    $(`#playlist-${i}`).append(`<li><a href="${videos[j].url}" class="playlist-entry" target="_blank" playlist="${i}" video="${j}">${videos[j].title}</a></li>`);
            }
        }

        $('.title-bar').click(hide);

        $('.playlist-entry').click(watched); 
    }
}

function hide() {
    let id = $(this).attr('index');
    if($(`#playlist-${id}`).is(':hidden'))
        $(`#playlist-${id}`).show();
    else
        $(`#playlist-${id}`).hide();
}

function watched(e) {
    e.preventDefault();
    let url = $(this).attr('href');
    let playlist = $(this).attr('playlist');
    let video = $(this).attr('video');
    console.log(`playlist:${playlist}, video:${video}`);
    account.playlists[playlist].videos[video].watched = true;
    localStorage.setItem('abs_account', JSON.stringify(account));
    $(this).hide();
    window.open(url)
}

function init() {
    if(account !== null) {
        $('.navbar-nav').html(`
            <li class="nav-item ms-auto">
                <a class="nav-link" href="#" id="account-options">Account Options</a>
            </li>
            <li class="nav-item ms-auto">
                <a class="nav-link" href="#" id="playlist-options">Playlist Options</a>
            </li>
            <li class="nav-item ms-auto">
                <a class="nav-link" href="#" id="log-off">Log off</a>
            </li>
        `);
        $('#log-off').click(function() { localStorage.removeItem('abs_account'); location.reload(); });
        playlist();
    } else {
        $('.navbar-nav').html(`
            <li class="nav-item ms-auto">
              <a class="nav-link active" aria-current="page" href="login.html">Login</a>
            </li>
        `);
        $('#popup-body').html(`
            <h3 id="account-warning">An account is required to use this extension and all of its features</h3>
            <div class="p-3">
                <a href="login.html" class="btn btn-secondary">Login</a>
            </div>
        `);
    }
}

$(document).ready(function() { init(); });