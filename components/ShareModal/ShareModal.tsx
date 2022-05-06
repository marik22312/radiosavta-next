import React from 'react'
import Modal from 'react-modal';
import { FacebookIcon, FacebookShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share';
import style from './ShareModal.module.scss';

export interface ShareType {
	FACEBOOK: "FACEBOOK";
	WHATSAPP: "WHATSAPP";
  }
  export interface ShareModalProps {
	isOpen: boolean;
	title: string;
	shareableTitle: string;
	url: string;
	onRequestClose?: () => void;
	onBeforeSave?: (type: ShareType) => void;
  }
  export const ShareModal: React.FC<ShareModalProps> = (props) => {
	return (
	  <div>
		<Modal
		  className={style.shareModal}
		  isOpen={props.isOpen}
		  onRequestClose={props.onRequestClose}
		  contentLabel={props.title}
		>
		  <div className={style.shareModalContent}>
			<h3 className={style.shareModalTitle}>{props.title}</h3>
			<div className={style.shareModalSocialWrapper}>
			  <FacebookShareButton url={props.url} quote={props.shareableTitle}>
				<FacebookIcon size={40} />
			  </FacebookShareButton>
			  <WhatsappShareButton url={props.url} title={props.shareableTitle}>
				<WhatsappIcon size={40} />
			  </WhatsappShareButton>
			</div>
			<input
			  readOnly
			  type="url"
			  value={props.url}
			  style={{ width: "100%", height: "40px", fontSize: "1rem" }}
			/>
		  </div>
		</Modal>
	  </div>
	);
  };
  