import { ReactElement } from 'react';

/* ZeresPluginLibrary.Modals */
export class Modals {
  static get ModalSizes(): {};

  static showUserProfile(userId: string): void;
  static showConfirmationModal(
    title: string,
    content: string,
    options?: {
      danger?: boolean;
      confirmText?: string;
      cancelText?: string;
      onConfirm?: Function;
      onCancel?: Function;
    }
  ): void;
  static showAlertModal(title: string, body: string): void;
  static showModal(
    title: string,
    children: ReactElement | ReactElement[],
    options?: {
      danger?: boolean;
      confirmText?: string;
      cancelText?: string;
      onConfirm?: Function;
      onCancel?: Function;
    }
  ): void;
  static showChangelogModal(title: string, version: string, changelog: Changelog, footer: string): void;
}

type Changelog = {
  title: string;
  type?: 'added' | 'improved' | 'fixed' | 'progress';
  items: string[];
};
