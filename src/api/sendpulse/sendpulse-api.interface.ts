export interface ISendpulseAPIService {
    sendMail(data: SMTPSendpulseRequest): Promise<SMTPSendpulseResponse>
}

export const ISendpulseAPIService = Symbol('ISendpulseAPIService')

/**
 * Описание ошибок Sendpulse API
 * @property {number} NoData                                - 8 Отсутствуют данные
 * @property {number} SenderEmailAddressMissing             - 10 Отсутствует e-mail адрес отправителя
 * @property {number} RecipientsAddressesMissing            - 11 Не указаны получатели
 * @property {number} EmptyEmailMessageContentField         - 13 Отсутствует контент email сообщения
 * @property {number} EmailAddressWithIDDoesntExists        - 14 Email адрес с заданным значением ID не найден
 * @property {number} EmailAddressDoesntExists              - 17 Email адрес не найден
 * @property {number} EmailAddressAlreadyExists             - 19 Такой email адрес уже существует
 * @property {number} NotAllowedUsingFreeEmailServices      - 20 Пожалуйста, не используйте бесплатные почтовые сервисы
 * @property {number} NoSuchEmailAddressAwaitingActivation  - 21 На активации нет указанного email адреса
 * @property {number} InvalidEmailAddressOrFreeEmailAccount - 97 Недопустимый тип email адреса. Использовать аккаунты бесплатных почтовых сервисов не рекомендуется.
 * @property {number} EmptyMailingListName                  - 201 Отсутствует название адресной книги
 * @property {number} MailingListNameAlreadyExists          - 203 Адресная книга с указанным именем уже существует
 * @property {number} MailingListEmpty                      - 211 Адресная книга пуста
 * @property {number} NotFoundEmailAddressesMailingList     - 213 Адресная книга не найдена.
 * @property {number} SMTPUserDoesntExist                   - 400 Не существует такого пользователя SMTP. Вам необходимо создать аккаунт в SMTP сервисе.
 * @property {number} SMTPEmailAddressDoesntExists          - 502 Не найден email адрес
 * @property {number} CampaignDoesntExist                   - 602 Кампания не найдена. Возможно, она была уже отправлена.
 * @property {number} SMTPSenderEmailAddressMissing         - 701 Отсутствует email адрес или имя отправителя
 * @property {number} SMTPNotFoundEmailAddressesMailingList - 703 Не найдена адресная книга
 * @property {number} SMTPSenderNotFound                    - 704 Не найден отправитель
 * @property {number} InsufficientFunds                     - 707 Недостаточно средств на счету
 * @property {number} TimeoutBetweenMailingListSend         - 711 Вам следует подождать 15 минут перед повторной попыткой отправки на данную адресную книгу
 * @property {number} EmptySubjectField                     - 720 Не указана тема письма
 * @property {number} SMTPEmptyEmailMessageContentField     - 721 Отсутствует контент email сообщения
 * @property {number} EmptyMailingListID                    - 722 Не указано ID адресной книги
 * @property {number} APICampaignsLimitExceeded             - 791 Лимит API-кампаний (5 в час) превышен
 * @property {number} InvalidDateFormat                     - 799 Неправильный формат даты. Должен быть в формате Y-m-d H:i:s и не может быть меньше текущей даты
 * @property {number} InvalidOperation                      - 800 Недопустимое действие
 * @property {number} CampaignNotFound                      - 802 Кампания не найдена
 * @property {number} EmailAddressBlacklisted               - 904 Email адрес найден в черном списке
 * @property {number} SenderAddressQuotaReached             - 905 Достигнут лимит доступного количества адресов отправителя
 * @property {number} EmailAddressSyntaxError               - 906 Ошибка в email адресе
 * @property {number} SpecifiedSenderDoesntExist            - 1003 Указанного отправителя не существует
 * @property {number} TimeoutBetweenSendingActivationCode   - 1004 Код активации был отправлен. Вам следует подождать 15 минут перед повторной попыткой.
 * @property {number} ErrorSendingConfirmation              - 1005 Ошибка при отправке подтверждения
 * @property {number} EmptyActivationCode                   - 1104 Отсутствует код активации
 * @property {number} TimeoutBetweenRequests                - 2020202020 Более 10 запросов в секунду
 */
export enum SendpulseApiErrorCodes {
    NoData = 8,

    SenderEmailAddressMissing = 10,

    RecipientsAddressesMissing = 11,

    EmptyEmailMessageContentField = 13,

    EmailAddressWithIDDoesntExists = 14,

    EmailAddressDoesntExists = 17,

    EmailAddressAlreadyExists = 19,

    NotAllowedUsingFreeEmailServices = 20,

    NoSuchEmailAddressAwaitingActivation = 21,

    InvalidEmailAddressOrFreeEmailAccount = 97,

    EmptyMailingListName = 201,

    MailingListNameAlreadyExists = 203,

    MailingListEmpty = 211,

    NotFoundEmailAddressesMailingList = 213,

    SMTPUserDoesntExist = 400,

    SMTPEmailAddressDoesntExists = 502,

    CampaignDoesntExist = 602,

    SMTPSenderEmailAddressMissing = 701,

    SMTPNotFoundEmailAddressesMailingList = 703,

    SMTPSenderNotFound = 704,

    InsufficientFunds = 707,

    TimeoutBetweenMailingListSend = 711,

    EmptySubjectField = 720,

    SMTPEmptyEmailMessageContentField = 721,

    EmptyMailingListID = 722,

    APICampaignsLimitExceeded = 791,

    InvalidDateFormat = 799,

    InvalidOperation = 800,

    CampaignNotFound = 802,

    EmailAddressBlacklisted = 904,

    SenderAddressQuotaReached = 905,

    EmailAddressSyntaxError = 906,

    SpecifiedSenderDoesntExist = 1003,

    TimeoutBetweenSendingActivationCode = 1004,

    ErrorSendingConfirmation = 1005,

    EmptyActivationCode = 1104,

    TimeoutBetweenRequests = 2020202020,
}

/**
 * @property {string} grant_type - Должен быть равен client_credentials
 * @property {string} client_id - Ваш ID
 * @property {string} client_secret - Ваш Secret
 */
export type OAuthSendpulseRequest = {
    grant_type: string
    client_id: string
    client_secret: string
}

/**
 * @property {string} token_type - Обычно Bearer
 * @property {string} token_type - Обычно 3600
 */
export type OAuthSendpulseResponse = {
    access_token: string
    token_type: string
    expires_in: number
}

type AttachmentData = {
    [key: string]: string
}

type VariableData = {
    [key: string]: string
}

/**
 * @property {base64} html                  - HTML версия письма, закодированная в base64
 * @property {string} subject               - Тема письма
 * @property {string} text                  - Текстовая версия письма
 * @property {object} attachments           - Сериализованный объект, в котором ключ - это имя файла, а значение - содержание файла {"название":"содержимое"}
 * @property {object} attachments_binary    - Сериализованный объект, в котором ключ - это имя файла, а значение - содержание файла,  закодированная в base64
 */
export type SMTPSendpulseRequest = {
    email: {
        html: string
        text: string
        subject: string
        template?: {
            id: number
            variables?: VariableData
        }
        attachments?: AttachmentData
        attachments_binary?: AttachmentData
        from: {
            name: string
            email: string
        }
        to: {
            name: string
            email: string
        }[]
    }
}

/**
 * @property {string} id - ID отправленного письма
 */
export type SMTPSendpulseResponse = {
    result: boolean
    id: string
}
