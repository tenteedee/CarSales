import {
  BACKEND_HOME_URL,
  FRONTEND_HOME_URL,
  MAIL_FROM_ADDRESS,
} from '../config/Config.js';
export function generateTestDriveEmailCustomer(user, testDriveInfo, staff) {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
      <table style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <tr>
          <td style="text-align: center;">
            <h1 style="color: #333333;">Hello, ${user.fullname}!</h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 20px; text-align: left;">
            <p style="font-size: 16px; color: #666666;">
              We would like to inform you that the status of your test drive request has been updated.
            </p>
            <p style="font-size: 16px; color: #333333; font-weight: bold;">
              Your requested car: <span style="color: #ff6600;">${
                testDriveInfo.car?.model
              }</span>
            </p>
            
            <p style="font-size: 16px; color: #333333; font-weight: bold;">
              Current Status: <span style="color: #ff6600;">${
                testDriveInfo.status
              }</span>
            </p>
            
            ${
              staff
                ? `
              <p style="font-size: 16px; color: #666666;">
                Here is the information of your assigned staff member:
              </p>
              <ul style="font-size: 16px; color: #666666;">
                <li><strong>Name:</strong> ${staff.full_name}</li>
                <li><strong>Email:</strong> ${staff.email}</li>
                <li><strong>Phone:</strong> ${staff.phone}</li>
              </ul>
            `
                : `
              <p style="font-size: 16px; color: #666666;">
                We are currently assigning a staff member to assist you. You will be notified shortly.
              </p>
            `
            }
            <p style="font-size: 16px; color: #666666;">
              If you have any questions or need further assistance, feel free to contact your assigned staff or <a href="mailto:support@carshop.com" style="color: #ff6600;">our support team</a>.
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding: 20px; text-align: center;">
            <a href="" style="display: inline-block; padding: 10px 20px; background-color: #ff6600; color: #ffffff; text-decoration: none; border-radius: 5px;">
              View Test Drive Details
            </a>
          </td>
        </tr>
        <tr>
          <td style="padding: 20px; text-align: center; background-color: #333333; color: #ffffff;">
            <p style="font-size: 14px;">
                If you have any questions, feel free to <a href="mailto:${MAIL_FROM_ADDRESS}" style="color: #ff6600;">contact us</a>.
            </p>
            <p style="font-size: 14px;">
              Thank you for choosing Car Shop.
            </p>
            <p style="font-size: 12px;">
              © 2024 Car Shop. All rights reserved.
            </p>
          </td>
        </tr>
      </table>
    </div>
  `;
}

export function generateTestDriveEmailStaff(user, testDriveInfo, staff) {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
      <table style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <tr>
          <td style="text-align: center;">
            <h1 style="color: #333333;">Hello, ${user.fullname}!</h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 20px; text-align: left;">
            <p style="font-size: 16px; color: #666666;">
              We would like to inform you that the status of your test drive request has been updated.
            </p>
            <p style="font-size: 16px; color: #333333; font-weight: bold;">
              Your requested car: <span style="color: #ff6600;">${
                testDriveInfo.car?.model
              }</span>
            </p>
            
            <p style="font-size: 16px; color: #333333; font-weight: bold;">
              Current Status: <span style="color: #ff6600;">${
                testDriveInfo.status
              }</span>
            </p>
            
            ${
              staff
                ? `
              <p style="font-size: 16px; color: #666666;">
                Here is the information of your assigned staff member:
              </p>
              <ul style="font-size: 16px; color: #666666;">
                <li><strong>Name:</strong> ${staff.full_name}</li>
                <li><strong>Email:</strong> ${staff.email}</li>
                <li><strong>Phone:</strong> ${staff.phone}</li>
              </ul>
            `
                : `
              <p style="font-size: 16px; color: #666666;">
                We are currently assigning a staff member to assist you. You will be notified shortly.
              </p>
            `
            }
            <p style="font-size: 16px; color: #666666;">
              If you have any questions or need further assistance, feel free to contact your assigned staff or <a href="mailto:support@carshop.com" style="color: #ff6600;">our support team</a>.
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding: 20px; text-align: center;">
            <a href="" style="display: inline-block; padding: 10px 20px; background-color: #ff6600; color: #ffffff; text-decoration: none; border-radius: 5px;">
              View Test Drive Details
            </a>
          </td>
        </tr>
        <tr>
          <td style="padding: 20px; text-align: center; background-color: #333333; color: #ffffff;">
            <p style="font-size: 14px;">
                If you have any questions, feel free to <a href="mailto:${MAIL_FROM_ADDRESS}" style="color: #ff6600;">contact us</a>.
            </p>
            <p style="font-size: 14px;">
              Thank you for choosing Car Shop.
            </p>
            <p style="font-size: 12px;">
              © 2024 Car Shop. All rights reserved.
            </p>
          </td>
        </tr>
      </table>
    </div>
  `;
}

export function generateStaffEmailTemplate(staff, password) {
  return `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
        <table style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <tr>
            <td style="text-align: center;">
              <h1 style="color: #333333;">Welcome to Car Shop, ${staff.fullname}!</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px; text-align: center;">
              <p style="font-size: 16px; color: #666666;">
                We are excited to have you on board. Below is your password to access your account at Car Shop.
              </p>
              <p style="font-size: 18px; font-weight: bold; color: #333333; padding: 10px 0;">
                Email: <span style="color: #ff6600;">${staff.email}</span>
              </p>
              <p style="font-size: 18px; font-weight: bold; color: #333333; padding: 10px 0;">
                Password: <span style="color: #ff6600;">${password}</span>
              </p>
              <p style="font-size: 16px; color: #666666;">
                Please keep this password secure and change it once you log in.
              </p>
              <a href="${BACKEND_HOME_URL}" style="display: inline-block; padding: 10px 20px; background-color: #ff6600; color: #ffffff; text-decoration: none; border-radius: 5px; margin-top: 20px;">
                Log in to your account
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px; text-align: center; background-color: #333333; color: #ffffff;">
              <p style="font-size: 14px;">
                If you have any questions, feel free to <a href="mailto:${MAIL_FROM_ADDRESS}" style="color: #ff6600;">contact us</a>.
              </p>
              <p style="font-size: 12px;">
                © 2024 Car Shop. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </div>
    `;
}
export function generateCustomerEmailTemplate(customer, password) {
  return `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
        <table style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <tr>
            <td style="text-align: center;">
              <h1 style="color: #333333;">Welcome to Car Shop, ${customer.fullname}!</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px; text-align: center;">
              <p style="font-size: 16px; color: #666666;">
                We are excited to have you on board. Below is your password to access your account at Car Shop.
              </p>
              <p style="font-size: 18px; font-weight: bold; color: #333333; padding: 10px 0;">
                Email: <span style="color: #ff6600;">${customer.email}</span>
              </p>
              <p style="font-size: 18px; font-weight: bold; color: #333333; padding: 10px 0;">
                Password: <span style="color: #ff6600;">${password}</span>
              </p>
              <p style="font-size: 16px; color: #666666;">
                Please keep this password secure and change it once you log in.
              </p>
              <a href="${FRONTEND_HOME_URL}" style="display: inline-block; padding: 10px 20px; background-color: #ff6600; color: #ffffff; text-decoration: none; border-radius: 5px; margin-top: 20px;">
                Log in to your account
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px; text-align: center; background-color: #333333; color: #ffffff;">
              <p style="font-size: 14px;">
                If you have any questions, feel free to <a href="mailto:${MAIL_FROM_ADDRESS}" style="color: #ff6600;">contact us</a>.
              </p>
              <p style="font-size: 12px;">
                © 2024 Car Shop. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </div>
    `;
}
