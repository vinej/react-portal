export const logger = store => next => action => {
  console.log(action);
  let result = next(action);
  return result;
};
 
/**
 * Sends crash reports as state is updated and listeners are notified.
 */
export const crashReporter = store => next => action => {
  try {
    return next(action);
  } catch (err) {
    console.error('Caught an exception!', err);
    throw err;
  }
};

/**
 * Schedules actions with { meta: { delay: N } } to be delayed by N milliseconds.
 * Makes `dispatch` return a function to cancel the timeout in this case.
 */
export const timeoutScheduler = store => next => action => {
  if (!action.meta || !action.meta.delay) {
    return next(action);
  }

  let timeoutId = setTimeout(
    () => next(action),
    action.meta.delay
  );

  return function cancel() {
    clearTimeout(timeoutId);
  };
};

/**
 * Schedules actions with { meta: { raf: true } } to be dispatched inside a rAF loop
 * frame.  Makes `dispatch` return a function to remove the action from the queue in
 * this case.
 */
export const rafScheduler = store => next => {
  let queuedActions = [];
  let frame = null;

  function loop() {
    frame = null;
    try {
      if (queuedActions.length) {
        next(queuedActions.shift());
      }
    } finally {
      maybeRaf();
    }
  }

  function maybeRaf() {
    if (queuedActions.length && !frame) {
      frame = requestAnimationFrame(loop);
    }
  }

  return action => {
    if (!action.meta || !action.meta.raf) {
      return next(action);
    }

    queuedActions.push(action);
    maybeRaf();

    return function cancel() {
      queuedActions = queuedActions.filter(a => a !== action);
    };
  };
};
