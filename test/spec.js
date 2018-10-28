import electron from 'electron';
import test from 'ava';
import {Application} from 'spectron';

test.beforeEach(async t => {
	t.context.app = new Application({
		path: electron,
		args: ['.']
	});

	await t.context.app.start();
});

test.afterEach.always(async t => {
	await t.context.app.stop();
});

test('General test', async t => {
	await t.context.app.client.waitUntilWindowLoaded();

	const win = t.context.app.browserWindow;
	t.is(await t.context.app.client.getWindowCount(), 1);
	t.false(await win.isMinimized());
	t.false(await win.isDevToolsOpened());
	t.true(await win.isVisible());
	t.true(await win.isFocused());

	const {width, height} = await win.getBounds();
	t.true(width > 100);
	t.true(height > 100);
});
