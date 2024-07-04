'use strict'

window.addEventListener("load",handleload);

function handleload()
{
    let button = document.getElementById("chatButton");
    button.addEventListener("click",ButtonClickHandle);
}
function ButtonClickHandle()
{
    let waarde = document.getElementById("NaamInput");
    let foutelement = document.getElementById("fouten")
    if (waarde.value === "" || waarde.value === null)
    {
       foutelement.textContent = "Geef eerst een naam in!!";
        setTimeout(() => {
            foutelement.textContent = "";
        }, 3000);
    }
    else
    {
        window.location.href = "ChatRuimte.html"
        localStorage.setItem("naam",waarde.value)
    }
}