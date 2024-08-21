import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, MotionConfig, motion as m } from 'framer-motion';

export default function Modal({
	open,
	onOpenChange,
	children,
}: {
	open: boolean;
	onOpenChange: (open: boolean) => void;
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
	open,
}: {
	title: string;
	children: React.ReactNode;
	open: boolean;
}) {
	const overlayVariant = {
		open: {
			opacity: 1,
			transition: { ease: 'easeOut', duration: 0.1 },
		},
		closed: {
			opacity: 0,
			transition: { ease: 'easeIn', duration: 0.2 },
		},
	};

	const contentVariant = {
		closed: {
			y: 'var(--y-closed, 0)',
			opacity: 'var(--opacity-closed)',
			scale: 'var(--scale-closed, 1)',
			transition: { type: 'spring', bounce: 0.3, duration: 0.4 },
		},
		open: {
			y: 'var(--y-open, 0)',
			opacity: 'var(--opacity-open)',
			scale: 'var(--scale-open, 1)',
			transition: { type: 'spring', bounce: 0.3, duration: 0.7 },
		},
	};
	return (
		<MotionConfig reducedMotion="user">
			<AnimatePresence>
				{open && (
					<Dialog.Portal forceMount>
						<Dialog.Overlay className="fixed inset-0 bg-overlay/60 p-5" asChild>
							<m.div
								variants={overlayVariant}
								initial="closed"
								animate="open"
								exit="closed"
							></m.div>
						</Dialog.Overlay>
						<Dialog.Content
							className="fixed max-sm:bottom-0 sm:top-1/3 sm:left-1/3 bg-background text-foreground max-sm:mx-2 p-8 sm:py-10 shadow rounded-md text-md sm:w-full max-w-md  max-sm:[--y-closed:18px] [--opacity-closed:0%] sm:[--scale-closed:90%]
                      max-sm:[--y-open:0px] [--opacity-open:100%] sm:[--scale-open:100%]"
							asChild
						>
							<m.div
								variants={contentVariant}
								initial="closed"
								animate="open"
								exit="closed"
							>
								<Dialog.Title className="text-xl">{title}</Dialog.Title>
								{children}
							</m.div>
						</Dialog.Content>
					</Dialog.Portal>
				)}
			</AnimatePresence>
		</MotionConfig>
	);
}

Modal.Button = Dialog.Trigger;
Modal.Content = ModalContent;
Modal.Close = Dialog.Close;
