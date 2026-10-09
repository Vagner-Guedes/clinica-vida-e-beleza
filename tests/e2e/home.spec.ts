import { expect, test } from '@playwright/test'

test('landing page presents the offer and main WhatsApp action', async ({ page }) => {
  const errors: string[] = []
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()) })
  await page.goto('/')
  await expect(page.getByRole('heading', { name: /Sua melhor versão começa aqui/i })).toBeVisible()
  await expect(page.getByRole('link', { name: /Solicitar avaliação/ }).first()).toHaveAttribute('href', /wa\.me\/5571999431212/)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  expect(errors).toEqual([])
})

test('faq is keyboard accessible and the link page works', async ({ page }) => {
  await page.goto('/')
  const faq = page.getByRole('button', { name: /Quais áreas/ })
  await faq.focus()
  await expect(faq).toBeFocused()
  await faq.press('Enter')
  await expect(faq).toHaveAttribute('aria-expanded', 'true')
  await page.goto('/links')
  await expect(page.getByRole('heading', { name: /Vida e Beleza/ })).toBeVisible()
  await expect(page.getByRole('link', { name: /Solicitar avaliação pelo WhatsApp/ })).toHaveAttribute('href', /wa\.me\/5571999431212/)
})

test('page keeps critical content visible with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page.getByRole('heading', { name: /O seu caminho pode ser simples/i })).toBeVisible()
  await expect(page.getByText(/Ed\. TK Tower/).first()).toBeVisible()
})

test('cookie consent and privacy page are available', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('region', { name: /Você escolhe como continuar/i })).toBeVisible()
  await page.getByRole('button', { name: /Somente necessários/i }).click()
  await expect(page.getByRole('region', { name: /Você escolhe como continuar/i })).toBeHidden()
  await page.goto('/privacidade')
  await expect(page.getByRole('heading', { name: /Privacidade e cookies/i })).toBeVisible()
  await expect(page.getByRole('heading', { name: /Cookies e armazenamento local/i })).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
})
