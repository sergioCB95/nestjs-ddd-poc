export type EventSubscriptionCallback<T> = (data: T) => Promise<void> | void;

export abstract class EventSubscriber {
  subscriptions: { [key: string]: EventSubscriptionCallback<any> } = {};
  protected abstract subscribeToEvent<T>(
    subscriptionName: string,
    callback: EventSubscriptionCallback<T>,
  ): Promise<void>;

  async subscribe<T>(
    subscriptionName: string,
    callback: EventSubscriptionCallback<T>,
  ): Promise<void> {
    this.subscriptions[subscriptionName] = callback;
    await this.subscribeToEvent(subscriptionName, callback);
  }
}
