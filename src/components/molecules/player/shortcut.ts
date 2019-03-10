import { IContainerStateToProps } from "src/components/molecules/player/container"

export const shortcut = (actions: IContainerStateToProps["actions"]) => {
  window.document.onkeydown = (event: KeyboardEvent) => {
    if (event.code === "Space") {
      actions.onToggle()
      event.preventDefault()
    }
  }
}
