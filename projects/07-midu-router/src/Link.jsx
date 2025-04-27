import { EVENTS, BUTTONS } from './consts';


function navigate(href){
    window.history.pushState({},'',href)
    // Crear un evento personalizado que avise del cambio de URL
    const navigationEvent = new Event(EVENTS.PUSHSTATE)
    window.dispatchEvent(navigationEvent)
}

export function Link ({ target, to, ...props }) {
    const handleClick = (event) => {
        const isMainEvent = event.button === BUTTONS.primary // primary button
        const isModifiedEvent = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey
        const isManageableEvent = target === "undefined" || target === "_self";

        if( isMainEvent && isManageableEvent && !isModifiedEvent ){
            event.preventDefault()
            navigate(to) // navegación SPA
        }

    }

    return <a onClick={ handleClick } href={ to } target={ target } {...props} />
}
