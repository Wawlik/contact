<template>
	<div class="uk-card uk-card-default uk-padding-small uk-border-rounded uk-width-1-1 uk-width-3-5@m uk-width-1-2@l">
		<div class="uk-grid uk-grid-collapse uk-flex-between uk-text-emphasis uk-margin-small">
			<h4>Редактирование контакта</h4>
			<div>
				<span
					uk-tooltip="Отменить все изменения"
					uk-icon="history"
					class="uk-margin-small-right cnt-container--revert-icon"
					@click="unsetChanges()"
				></span>
				<span
					uk-tooltip="Отменить последнее изменение"
					uk-icon="reply"
					class="uk-margin-small-right cnt-container--revert-icon"
					@click="getStageChange(step-1)"
				></span>
				<span
					uk-tooltip="Повторить отмененное изменение"
					uk-icon="forward"
					class="uk-margin-small-right cnt-container--revert-icon"
					@click="getStageChange(step+1)"
				></span>
				<span
					uk-tooltip="Удалить контакт"
					uk-icon="trash"
					class="uk-margin-small-right cnt-container--delete-icon"
					@click="getConfirm(null, head)"
				></span>
			</div>
		</div>
		<div>
			<label for="new-contact-name">Название конакта</label>
			<input
				type="text"
				id="new-contact-name"
				class="uk-input uk-margin-small-top"
				v-model="head"
			/>
			<div class="uk-margin">
				<div>
					<div class="uk-margin">
						<div v-if="savedForm" >
							&nbsp;<span v-if="ccontact && ccontactType" @click="addTypeConn()"
								class="text-success" uk-icon="plus-circle">Сохранить</span>
							&nbsp;<span @click="cancelEdit()" class="text-success" uk-icon="plus-circle">Отменить</span>
						</div>
						<div v-else-if="ccontact && ccontactType">
							<button @click="addTypeConn()" class="uk-button uk-button-default uk-button-primary uk-border-pill">
								Добавить
							</button>
						</div>
						<div class="uk-inline uk-width-1-1 uk-margin-small-top">
							<select
								v-model="ccontactType"
								type="text"
								id="new-contact--type"
								class="uk-input"
								v-on:keyup.13="addNewCnt">
								<option v-for="one in types" :key="one.text" :value="one">{{one.type}}</option>
							</select>
						</div>
						<div class="uk-inline uk-width-1-1 uk-margin-small-top">
							<input
								v-model="ccontact"
								type="text"
								id="new-contact--text"
								class="uk-input"
								v-on:keyup.13="addNewCnt"
							/>
						</div>
					</div>
				</div>
				<ul class="uk-list uk-list-bullet">
					<li
						class="uk-text-left uk-text-truncate"
						v-for="(two, index2) in forms"
						:key="'newCnt-'+index2"
					>{{two.name}}</li>
				</ul>
			</div>
			<div v-for="(one, ind) in forms" :key="one.type.type + ' : ' + one.text"
				class="uk-margin uk-grid uk-grid-collapse uk-flex-middle uk-flex-between uk-card uk-card-default">
				<div class="uk-margin uk-text-left uk-margin-small-left">
					<div class="uk-inline uk-width-1-1 uk-margin-small-top uk-text-lead">
						{{one.type.type}}:
					</div>
					<div class="uk-inline uk-width-1-1 uk-margin-small-top">
						{{one.text}}
					</div>
				</div>
				<div class="uk-grid uk-grid-small uk-margin-small-right">
					<div @click="editFormOfConn(ind)">
						<button class="uk-button uk-button-small uk-button-primary uk-border-pill">
							<span uk-icon="pencil"></span>
						</button>
					</div>
					<div @click="delFormOfConn(ind)">
						<button class="uk-button uk-button-small uk-button-danger uk-border-pill">
							<span uk-icon="trash"></span>
						</button>
					</div>
				</div>
					
			</div>
		</div>
		<button class="uk-button uk-button-small uk-button-primary" @click="saveToLS()">Сохранить</button>
		<button class="uk-button uk-button-small uk-button-default" @click="confirmCancelEditing()">Отменить</button>
	</div>
</template>

<script>
import _mixins from "../_mixins.js";

export default {
	name: "note",
	mixins: [_mixins],
	data() {
		return {
			head: "",
			forms: [],
			lskey: "contacts",
			ccontact: "",
			ccontactType: "",
			savedContact: null, // object before changes,
			stageChange: null,
			step: 0,
			editInd: null,
			savedForm: null,
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
			],
		};
	},
	methods: {
		editFormOfConn(ind){
			this.setStageChange();
			const misc = this.forms[ind];
			this.forms.splice(ind, 1);
			this.savedForm = JSON.parse(JSON.stringify(misc));
			this.editInd = ind;
			this.ccontact = misc.text;
			this.ccontactType = misc.type;
		},
		delFormOfConn(ind){
			this.setStageChange();
			this.forms.splice(ind, 1);
		},
		addTypeConn(){
			const obj = {
				text: this.ccontact,
				type: this.ccontactType
			}
			if(this.editInd === 0){
				this.forms.unshift(obj);
			}
			else if(this.editInd){
				// check if editing
				this.forms.splice(this.editInd, 0, obj);
			} else {
				this.setStageChange();	
				this.forms.push(obj);
			}
			this.ccontactType = this.ccontact = "";
			if(this.savedForm){
				this.rmEditingMode();
			}
		},
		cancelEdit(){
			this.formsOfConn.splice(this.editInd, 0, this.savedForm);
			this.rmEditingMode();
		},
		rmEditingMode(){
			this.ccontactType = this.ccontact = "";
			this.savedForm = this.editInd = null;
		},
		confirmCancelEditing(){
			if (window && window.UIkit) {
				let self = this;
				const txt = 'Вы уверены, что хотите отменить редактирование и перейти на главную?';
				window.UIkit.modal.confirm(txt).then(
					function () {
						self.$router.push('/list/');
					},
					function () {
						return 0;
						// Canceled
					}
				);
			} else {
				this.notifyErr('Что-то пошло не так. Возможны вы не в сети. Попробуйте перезагрузить страницу')
			}
		},
		async getConfirm(index, name) {
			let a = await this.confirmDelete(index, name);
			if (a) {
				// move to main
				this.$router.push("/list/");
			} else {
				// declined
			}
		},
		setStageChange(step = this.step) {
			if (!this.stageChange) {
				this.stageChange = [];
			}
			this.stageChange[step] = JSON.parse(
				JSON.stringify({ name: this.head, cnt: this.forms })
			);
			this.step++;
		},
		getStageChange(num) {
			if ((num || num === 0) && this.stageChange) {
				if (this.stageChange[num]) {
					if (num < this.step) {
						this.stageChange[this.step] = JSON.parse(
							JSON.stringify({ name: this.head, cnt: this.forms })
						);
						this.head = JSON.parse(JSON.stringify(this.stageChange[num].name));
						this.forms = JSON.parse(JSON.stringify(this.stageChange[num].cnt));
						this.step = num;
					} else {
						this.head = JSON.parse(JSON.stringify(this.stageChange[num].name));
						this.forms = JSON.parse(JSON.stringify(this.stageChange[num].cnt));
						this.step = num;
					}
				}
			}
		},
		unsetChanges() {
			if (window && window.UIkit) {
				let self = this;
				const txt = "Вы уверены, что хотите отменить все изменения?";
				window.UIkit.modal.confirm(txt).then(
					function() {
						// store change
						self.setStageChange();
						self.head = JSON.parse(JSON.stringify(self.savedContact.name));
						self.forms = JSON.parse(JSON.stringify(self.savedContact.forms));
						// save initial stage
						self.saveToLS();
					},
					function() {
						// Canceled
					}
				);
			}
		},
		saveToLS() {
			if (!this.forms.length) {
				this.notifyWarn("Добавьте хотя бы один пункт в список");
				return;
			}
			if (!this.head) {
				this.notifyWarn("Введите название контакта");
				return;
			}
			let data = null;
			try {
				const str = localStorage.getItem(this.lskey);
				if (str) {
					data = JSON.parse(str);
					const obj = {
						name: this.head,
						forms: this.forms
					}
					// add sort
					data.splice(+this.$route.params.id, 1 ,obj);
					const misc = JSON.stringify(data);
					localStorage.setItem(this.lskey, misc);
				} else {
					data = JSON.stringify([this.newContact]);
					localStorage.setItem(this.lskey, data);
				}
				this.ccontactType = this.ccontact = "";
				this.notifyOk();
			} catch (error) {
				console.error(error);
			}
		},
		addNewCnt() {
			if (this.ccontact) {
				this.setStageChange();
				this.forms.unshift({ name: this.ccontact, done: false });
				this.ccontact = "";
			} else {
				this.notifyWarn("Опишите задачу");
			}
		},
		getCcontact() {
			if (
				this.$route &&
				this.$route.params &&
				typeof (+this.$route.params.id === "number")
			) {
				const id = this.$route.params.id;
				try {
					const str = localStorage.getItem(this.lskey);
					if (str) {
						const contacts = JSON.parse(str);
						if (contacts[id]) {
							this.savedContact = JSON.parse(JSON.stringify(contacts[id]));
							this.head = contacts[id].name;
							this.forms = contacts[id].forms || [];
						}
					}
				} catch (error) {
					console.error(error);
				}
			} else {
				this.head = "Неверный номер контакта";
			}
		}
	},
	mounted() {
		this.getCcontact();
	}
};
</script>
