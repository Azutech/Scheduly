import { EventEmitter } from 'events';

class NotificationEmitter extends EventEmitter {}
export const notificationEmitter = new NotificationEmitter();

notificationEmitter.on('notifications created', () => {
	console.log('Listener');
});
