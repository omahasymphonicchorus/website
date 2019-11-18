<template>
  <header>
    <Navbar
      position="fixed"
      type="primary"
      :transparent="transparent"
      :color-on-scroll="colorOnScroll"
      menu-classes="ml-auto"
    >
      <template>
        <a class="navbar-brand" href="/">{{ content.title }}</a>
      </template>
      <template slot="navbar-menu">
        <li
          class="nav-item"
          v-for="section in content.sections"
          v-bind:key="section.title"
        >
          <a class="nav-link" :href="section.link">{{ section.title }}</a>
        </li>
        <li class="nav-item">
          <button
            id="donate-button"
            class="nav-link btn btn-neutral"
            data-toggle="modal"
            data-target="#donation-form"
          >
            DONATE
          </button>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            rel="tooltip"
            title="Rehearsal and event calendar"
            data-placement="bottom"
            href="https://calendar.google.com/calendar/embed?src=calendar%40omahasymphonicchorus.org&ctz=America%2FChicago"
            target="_blank"
          >
            <font-awesome-icon
              :icon="['far', 'calendar']"
              size="lg"
            ></font-awesome-icon>
            <p class="d-lg-none d-xl-none">Calendar</p>
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            rel="tooltip"
            title="Like us on Facebook"
            data-placement="bottom"
            href="https://www.facebook.com/OmahaSymphonicChorus"
            target="_blank"
          >
            <font-awesome-icon
              :icon="['fab', 'facebook']"
              size="lg"
            ></font-awesome-icon>
            <p class="d-lg-none d-xl-none">Facebook</p>
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            rel="tooltip"
            title="Support us through a purchase from Amazon Smile"
            data-placement="bottom"
            href="https://smile.amazon.com"
            target="_blank"
          >
            <font-awesome-icon
              :icon="['fab', 'amazon']"
              size="lg"
            ></font-awesome-icon>
            <p class="d-lg-none d-xl-none">Amazon Smile</p>
          </a>
        </li>
      </template>
    </Navbar>
  </header>
</template>

<script>
import { Navbar } from "@/components";
export default {
  data: function() {
    return {
      transparent: true,
      colorOnScroll: 400
    };
  },
  props: ["content"],
  components: {
    Navbar
  }
};
</script>

<style></style>
