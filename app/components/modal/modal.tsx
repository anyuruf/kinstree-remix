import * as Dialog from '@radix-ui/react-dialog';

export default function Modal({
	open,
	onOpenChange,
	children,
}: {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	children: React.ReactNode;
}) {
	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			{children}
		</Dialog.Root>
	);
}

function ModalContent({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<Dialog.Portal>
			<Dialog.Overlay className="fixed inset-0 bg-overlay/60 p-5" />
			<Dialog.Content className="fixed top-1/2 left-1/2 bg-background text-foreground p-8 -translate-x-1/2 -translate-y-1/2 shadow rounded-md w-full text-md max-w-md">
				<Dialog.Title className="text-xl">{title}</Dialog.Title>
				{children}
			</Dialog.Content>
		</Dialog.Portal>
	);
}

Modal.Button = Dialog.Trigger;
Modal.Content = ModalContent;
Modal.Close = Dialog.Close;
