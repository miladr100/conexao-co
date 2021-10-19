<template>
  <v-row>
        <div v-if="!isMobile"> 
            <button
                v-if="showButton"
                class="button button__subscribe-w"
                @click="showButton = false"
            >
                {{buttonTitle}}
            </button>
            <div
                v-if="!showButton && !isSubscribed"
                class="form-w d-flex flex-column"
            >
                <v-text-field
                    v-model="form.name"
                    label="Digite seu nome completo"
                    placeholder="Ex: Marcos Rogério"
                    filled
                ></v-text-field>
                <v-text-field
                    v-model="form.email"
                    label="Digite seu melhor email"
                    placeholder="Ex: meuemail@email.com"
                    filled
                ></v-text-field>
                <v-row>
                    <v-col cols="4">
                        <v-select
                            v-model="form.state"
                            :items="states"
                            item-text="value"
                            :disabled="states.length == 0"
                            label="Estado"
                            placeholder="Selecione seu estado"
                            filled
                        ></v-select>
                    </v-col>
                    <v-col cols="8">
                        <v-select
                            v-model="form.city"
                            :items="cities"
                            item-text="value"
                            :disabled="cities.length == 0"
                            label="Cidade"
                            placeholder="Selecione sua cidade"
                            filled
                        ></v-select>
                    </v-col>
                </v-row>
            </div>

            <p v-if="isSubscribed" class="subscribed-w">
                Inscrição realizada com sucesso!
            </p>
            <div
                v-if="isSubscribed"
                class="d-flex flex-row align-center mb-4"
            >
                <span>
                    <p class="date-w">
                        Agora é sua vez de contribuir com o conexão!
                    </p>
                    <p class="date-w">
                        Compartilhe o evento com seus amigos ;)
                    </p>
                </span>
                <div @click="shareViaWhatsApp()">
                    <span
                    class="iconify"
                    data-icon="mdi:whatsapp"
                    style="color: #ef815d"
                    data-width="52"
                    data-height="52"
                    ></span>
                </div>
            </div>

            <button
                v-if="!showButton && !isSubscribed"
                class="button button__send-w"
                @click="handleSubmit('web')"
            >
                {{submitButtonTitle}}
            </button>
        </div>
        <div v-else></div>
  </v-row>
</template>

<script>
export default {
    name: 'YSubscriptionForm',
    props: {
        buttonTitle: {
            type: String,
            default: '',
            require: true,
        },
        submitButtonTitle: {
            type: String,
            default: '',
        },
        isMobile: {
            type: Boolean,
            default: false,
        },
        states: {
            type: Array,
            default: () => [],
        },
        cities: {
            type: Array,
            default: () => [],
        }
    },
    data() {
        return {
            showButton: true,
            isSubscribed: false,
            form: {
                name: '',
                email: '',
                state: '',
                city: '',
            },
        }
    }
}
</script>

<style lang="scss" scoped>
$color-primary:  #3cb4e5;
$color-primary-dark:  #011e41;
$color-primary-light:  #082a53;
$color-secondary: #f0f1f1;
$color-tertiary: #e78f12;

.button {
    transition-duration: 0.4s;
    color: $color-primary;
    text-transform: uppercase;
    border: 2px solid $color-primary;
    border-radius: 60px;
    cursor: pointer;
    font-family: 'Balsamiq Sans';

    &:hover {
        outline: none;
        border: 2px solid $color-primary-dark;
        color: $color-primary-dark;
    }

    &__subscribe {
        &-w {
            // font-family: 'Quicksand';
            font-size: 36px;
            font-weight: 500;
            padding: 4px 32px;
        }
        &-m {
            font-size: 28px;
            font-weight: 500;
            padding: 6px 26px;
        }
    }

    &__send {
        &-w {
            font-size: 18px;
            font-weight: 400;
            padding: 4px 42px;
            margin-left: 8.5rem;
        }
        &-m {
            font-size: 18px;
            font-weight: 400;
            padding: 6px 32px;
            margin: 12px 0;
            margin-left: 5rem;
        }
    }
}

.subscribed {
    &-w {
        font-size: 2.5rem;
        font-weight: 500;
        color: $color-primary-dark;
        margin: 36px 0 36px 2vw;
    }
    &-m {
        font-size: 1.5rem;
        font-weight: 500;
        color: $color-primary-dark;
        text-align: center;
        margin: 28px 0;
    }
}

.date {
    &-w {
        margin-left: 2vw;
        font-size: 1.8rem;
        font-weight: 500;
        color: $color-primary;
    }
    &-m {
        font-size: 1rem;
        font-weight: 500;
        text-align: center;
        color: $color-primary;
        margin-top: 0.5rem;
    }
}

.iconify {
    transition-duration: 0.4s;
    cursor: pointer;
    margin-left: 12px;

    &:hover {
        margin-bottom: 6px;
    }
}

</style>