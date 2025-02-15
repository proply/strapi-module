import type { Ref } from 'vue'
import { StrapiUser } from '../types'
import { useState } from '#app'

export const useStrapiUser = (): Ref<StrapiUser> => useState<StrapiUser>('strapi_user')
