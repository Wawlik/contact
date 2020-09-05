<template>
	<div>
		<div v-if="newContact">
			<h4>Создание нового контакта</h4>
			<div class="uk-margin-auto uk-card uk-card-default uk-padding uk-border-rounded
				uk-text-left uk-width-1-1 uk-width-4-5@s uk-width-3-5@m uk-width-1-2@xl">
				<label for="new-contact-name">Название конакта</label>
				<input
					type="text"
					id="new-contact-name"
					class="uk-input uk-margin-small-top"
					v-model="newContact.name"
				/>
			</div>
			<div class="uk-margin">
				<button
					class="uk-button uk-button-small uk-button-primary"
					@click="addNewContactToLS()">Создать контакт</button>
				<button class="uk-button uk-button-small uk-button-default" @click="newContact=false">Отменить</button>
			</div>
		</div>
		<h3 v-if="contacts && contacts.length">
			Ваши контакты:
			<span uk-icon="plus-circle" class="cursor-pointer" @click="enableContactAdd()"></span>
		</h3>
		<div v-if="contacts && contacts.length" class="uk-grid uk-grid-small">
			<router-link
				:to="'/list/contact/'+index"
				class="uk-link-reset uk-width-1-1 uk-width-1-2@s uk-width-1-3@m uk-width-1-4@xl uk-margin-small-bottom"
				v-for="(one, index) in contacts"
				:key="one.id"
			>
				<div class="uk-card uk-card-default uk-padding-small uk-border-rounded">
					<div class="uk-grid uk-grid-collapse uk-flex-between">
						<p class="uk-text-bold uk-text-left uk-text-truncate">{{one.name}}</p>
						<span
							uk-icon="trash"
							class="cursor-pointer text-danger"
							@click.prevent="getConfirm(index, one.name)"
						></span>
					</div>
				</div>
			</router-link>
		</div>
		<div v-else-if="!newContact">
			<h3 class="cursor-pointer" @click="enableContactAdd()">У Вас нет контактов</h3>
			<svg style="width:124px;height:124px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" 
			viewBox="0 0 24 24"><path fill="#333" d="M15.5,12C18,12 20,14 20,16.5C20,17.38 19.75,18.21 19.31,18.9L22.39,22L21,23.39L17.88,20.32C17.19,20.75 16.37,21 15.5,21C13,21 11,19 11,16.5C11,14 13,12 15.5,12M15.5,14A2.5,2.5 0 0,0 13,16.5A2.5,2.5 0 0,0 15.5,19A2.5,2.5 0 0,0 18,16.5A2.5,2.5 0 0,0 15.5,14M10,4A4,4 0 0,1 14,8C14,8.91 13.69,9.75 13.18,10.43C12.32,10.75 11.55,11.26 10.91,11.9L10,12A4,4 0 0,1 6,8A4,4 0 0,1 10,4M2,20V18C2,15.88 5.31,14.14 9.5,14C9.18,14.78 9,15.62 9,16.5C9,17.79 9.38,19 10,20H2Z" /></svg>
			<h3 class="cursor-pointer" @click="enableContactAdd()">
				но вы можете их
				<span class="text-success"> добавить</span> 
				&nbsp;<span class="text-success" uk-icon="plus-circle"></span>
			</h3>
		</div>
	</div>
</template>

<script>
import _mixins from "../_mixins.js";

export default {
	name: "mainPage",
	mixins: [_mixins],
	data() {
		return {
			newContact: null,
			contacts: null,
			lskey: "contacts",
			types: [
				{
					type: 'Skype',
					id: '1'
				},
				{
					type: 'E-mail',
					id: '2'
				},
				{
					type: 'Telephone',
					id: '3'
				},
				{
					type: 'Telegram',
					id: '4'
				},
				{
					type: 'Whatsapp',
					id: '5'
				}
			]
		};
	},
	methods: {
		enableContactAdd() {
			this.newContact = {
				name: "",
				cnt: []
			};
		},
		getContacts() {
			try {
				const str = localStorage.getItem(this.lskey);
				if (str) {
					this.contacts = JSON.parse(str);
				}
			} catch (error) {
				console.error(error);
			}
		},
		addNewContactToLS() {
			if (!this.newContact.name) {
				this.notifyWarn("Введите название контакта");
				return;
			}
			let data = null;
			try {
				const str = localStorage.getItem(this.lskey);
				if (str) {
					data = JSON.parse(str);
					const obj = {
						name: this.newContact.name,
						forms: []
					}
					data.unshift(obj);
					const misc = JSON.stringify(data);
					localStorage.setItem(this.lskey, misc);
				} else {
					data = JSON.stringify([this.newContact]);
					localStorage.setItem(this.lskey, data);
				}
				this.newContact = null;
				this.getContacts();
			} catch (error) {
				console.error(error);
			}
		}
	},
	mounted() {
		this.getContacts();
	}
};
</script>

<style>
</style>
