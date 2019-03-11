import { IContainerStateToProps } from "src/components/molecules/player/container"

export const shortcut = (actions: IContainerStateToProps["actions"]) => {
  document.addEventListener("keydown", (ev: KeyboardEvent) => {
    if (ev.code === "Space") {
      ev.preventDefault()
      actions.onToggle()
    }
    if (ev.code === "KeyM") {
      ev.preventDefault()
      actions.onToggleMute()
    }
    if (ev.code === "ArrowUp") {
      ev.preventDefault()
      actions.onVolumeUp()
    }
    if (ev.code === "ArrowDown") {
      ev.preventDefault()
      actions.onVolumeDown()
    }
    if (ev.code === "ArrowLeft") {
      ev.preventDefault()
      actions.updatePlayTimeFromCurrent(-5)
    }
    if (ev.code === "ArrowRight") {
      ev.preventDefault()
      actions.updatePlayTimeFromCurrent(+5)
    }
  })
}
