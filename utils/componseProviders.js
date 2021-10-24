export function componseProviders(providers = [], children) {
  return providers.reverse().reduce((child, layout) => {
    const [Provider, props] = Array.isArray(layout)
      ? [layout[0], layout[1]]
      : [layout, {}];

    return <Provider {...props}>{acc}</Provider>;
  }, children);
}
