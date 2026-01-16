import { NextRequest, NextResponse } from 'next/server';

interface BookingData {
  name: string;
  email: string;
  phone: string;
  vehicleBrand: string;
  serviceType: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
  consent: boolean;
}

// Validation helpers
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 9 && cleaned.length <= 15;
}

function validateBookingData(data: BookingData): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name is required and must be at least 2 characters');
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.push('Valid email is required');
  }

  if (!data.phone || !isValidPhone(data.phone)) {
    errors.push('Valid phone number is required');
  }

  if (!data.vehicleBrand) {
    errors.push('Vehicle brand is required');
  }

  if (!data.serviceType) {
    errors.push('Service type is required');
  }

  if (!data.preferredDate) {
    errors.push('Preferred date is required');
  }

  if (!data.preferredTime) {
    errors.push('Preferred time is required');
  }

  if (!data.consent) {
    errors.push('Consent is required');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const bookingData: BookingData = body;

    // Validate the data
    const validation = validateBookingData(bookingData);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 }
      );
    }

    // In production, you would:
    // 1. Save to database
    // 2. Send confirmation email
    // 3. Notify CRM/staff
    // 4. Create calendar event

    // Example: Send email notification (using a service like SendGrid, Resend, etc.)
    // await sendEmail({
    //   to: 'service@profixautocare.ae',
    //   subject: `New Booking: ${bookingData.name} - ${bookingData.serviceType}`,
    //   body: formatBookingEmail(bookingData),
    // });

    // Example: Save to database (using Prisma, Drizzle, etc.)
    // await db.booking.create({ data: bookingData });

    // Log for development
    console.log('New booking received:', {
      name: bookingData.name,
      email: bookingData.email,
      phone: bookingData.phone,
      vehicleBrand: bookingData.vehicleBrand,
      serviceType: bookingData.serviceType,
      preferredDate: bookingData.preferredDate,
      preferredTime: bookingData.preferredTime,
      timestamp: new Date().toISOString(),
    });

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Booking received successfully',
      bookingId: `BK-${Date.now()}`,
    });
  } catch (error) {
    console.error('Booking submission error:', error);
    
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Booking API - Use POST to submit a booking' },
    { status: 200 }
  );
}
