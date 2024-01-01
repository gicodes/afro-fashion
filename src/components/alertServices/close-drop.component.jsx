// Close a dropdown with custom delay function

export default function removeAlert(state, alert) {
  if (state === false) return;

  if (fade) {
    // fade out alert
    setAlerts(
      alerts.map((x) =>
        x.itemId === alert.itemId ? { ...x, fade: true } : x
      )
    );

    // remove alert after faded out
    setTimeout(() => {
      setAlerts((alerts) => alerts.filter((x) => x.itemId !== alert.itemId));
    }, 250);
  } else {
    // remove alert
    setAlerts((alerts) => alerts.filter((x) => x.itemId !== alert.itemId));
  }
}