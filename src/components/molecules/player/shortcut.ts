import { IContainerStateToProps } from "src/components/molecules/player/container"

export const shortcut = (actions: IContainerStateToProps["actions"]) => {
  document.addEventListener("keydown", (ev: KeyboardEvent) => {
    if (ev.code === "Space") {
      actions.onToggle()
      ev.preventDefault()
    }
  })
}
